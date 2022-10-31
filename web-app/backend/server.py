import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from pymongo import MongoClient
import certifi
from passlib.hash import sha256_crypt

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

ca = certifi.where()
CONNECTION_STRING = "mongodb+srv://Vufoo:Thanh123@cluster0.u5ttiid.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING, tlsCAFile=ca)
db = client['App']
user_collection = db["Users"]

inventory = {}
joined = -1

# #jwt = JWTManager(app)
# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             data = response.get_json()
#             if type(data) is dict:
#                 data["access_token"] = access_token 
#                 response.data = json.dumps(data)
#         return response
#     except (RuntimeError, KeyError):
#         # Case where there is not a valid JWT. Just return the original respone
#         return response


# @app.route('/projects')
# #@jwt_required()
# def my_profile():
#     response_body = {
#         "name": "JimboandFriends",
#         "about" :"sup"
#     }

#     return response_body
    

# @app.route('/token', methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return {"msg": "Wrong email or password"}, 401

#     access_token = create_access_token(identity=email)

#     response = {"access_token":access_token}
#     return response


# @app.route("/logout", methods=["POST"])
# def logout():
#     response = jsonify({"msg": "logout successful"})
#     unset_jwt_cookies(response)
#     return response

@app.route("/")
def home():
    return "starting page"

@app.route("/checkIn/<int:proj_id>/<int:qty>/<int:HWSet>")
def checkIn_hardware(proj_id, qty, HWSet):
    if proj_id in inventory:
        if HWSet == 1:
            inventory[proj_id][0] += qty
            if inventory[proj_id][0] >= 100:
                inventory[proj_id][0] = 100
        else:
            inventory[proj_id][1] += qty
            if inventory[proj_id][1] >= 100:
                inventory[proj_id][1] = 100
    else:
        if HWSet == 1:
            inventory[proj_id] = [qty, 0]
        else:
            inventory[proj_id] = [0, qty]

    return jsonify({'qty': qty})

@app.route("/checkOut/<int:proj_id>/<int:qty>/<int:HWSet>")
def checkOut_hardware(proj_id, qty, HWSet):
    if proj_id in inventory:
        if HWSet == 1:
            inventory[proj_id][0] -= qty
            if inventory[proj_id][0] <= 0:
                inventory[proj_id][0] = 0
        else:
            inventory[proj_id][1] -= qty
            if inventory[proj_id][1] <= 0:
                inventory[proj_id][1] = 0
    else:
        return jsonify({'error': 'Project ID does not exist'})

    return jsonify({'qty': qty})

@app.route("/joinProject/<int:proj_id>")
def joinProject(proj_id):
    global joined
    if joined == -1:
        joined = proj_id
    else:
        return jsonify({'status': 0, 'msg': 'Already joined a project!'})
    return jsonify({'status': 1, 'msg': f'Joined project {proj_id}'})

@app.route("/leaveProject/<int:proj_id>")
def leaveProject(proj_id):
    global joined
    if joined == -1:
        return jsonify({'status': 0, 'msg': "Haven't joined a project"})
    elif proj_id != joined:
        return jsonify({'status': 0, 'msg': "Haven't joined this project"})
    else:
        joined = -1
    return jsonify({'status': 1, 'msg': f'Left project {proj_id}'})


@app.route('/login/<userName>/<password>/<userID>', methods = ['GET','POST'])
def login(userName, password, userID):
    user = user_collection.find_one({
        'userName': userName,
    })

    if user:
        if sha256_crypt.verify(userID, user['userID']):
            if sha256_crypt.verify(password, user['password']):
                return jsonify({'msg': "Logged in", 'login': True})

    return jsonify({'msg': "User or password incorrect", 'login': False})



@app.route('/signup/<userName>/<password>/<userID>', methods = ['GET','POST'])
def signUp(userName, password, userID):
    user = {
        'userName': userName,
        'password': sha256_crypt.encrypt(password),
        'userID': sha256_crypt.encrypt(userID)
    }
    
    if user_collection.find_one({'userID': userID}):
        return jsonify({'msg': "UserID used already"})

    if user_collection.insert_one(user):
        return jsonify({'msg': "User signed up"})
    
    return jsonify({'msg': "Signup failed"})
   



if __name__ == '__main__':
    app.run(debug=True)


#from user import routes



