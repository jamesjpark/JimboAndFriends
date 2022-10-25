import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo import MongoClient
import pymongo
import certifi
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

ca = certifi.where()
CONNECTION_STRING = "mongodb+srv://Vufoo:Thanh123@cluster0.u5ttiid.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=ca)
db = client['App']
user_collection = db["Users"]


jwt = JWTManager(app)
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route('/projects')
@jwt_required()
def my_profile():
    response_body = {
        "name": "JimboandFriends",
        "about" :"sup"
    }

    return response_body
    

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)

    response = {"access_token":access_token}
    return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response




@app.route('/login/<userName>/<password>/<userID>', methods = ['GET','POST'])
def login(userName, password, userID):
    user = user_collection.find_one({
        'userName': userName,
        'password': password,
        'userID': userID
    })

    if user:
        return jsonify({'msg': "Logged in"})
   
    return jsonify({'msg': "User not found"})



@app.route('/signup/<userName>/<password>/<userID>', methods = ['GET','POST'])
def signUp(userName, password, userID):
    user = {
        'userName': userName,
        'password': password,
        'userID': userID
    }
    

    if user_collection.find_one({'userID': user['userID']}):
        return jsonify({'msg': "UserID used already"})

    if user_collection.insert_one(user):
        return jsonify({'msg': "User signed up"})
    
    return jsonify({'msg': "Signup failed"})
   



if __name__ == '__main__':
    app.run(debug=True)


from user import routes



