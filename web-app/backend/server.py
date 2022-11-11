import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import certifi
from passlib.hash import sha256_crypt
from bson.json_util import dumps

app = Flask(__name__,static_folder= './build', static_url_path='/')
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['CORS_HEADERS'] = 'Content-Type'
ca = certifi.where()
CONNECTION_STRING = "mongodb+srv://hloo:n63KLSdtzC02ZjVa@jimboandfriends.gul6vvc.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING, tlsCAFile=ca)

db = client['App']
user_collection = db["Users"]
project_collection = db["Projects"]
authorized_collection = db["Authorized Users"]

@app.route("/")
@cross_origin()
def index():
    print("ERHRERERE")
    return app.send_static_file('index.html')


@app.route("/api/checkIn/<int:projectID>/<int:hwSet>/<int:qty>", methods=['GET'])
@cross_origin()
def checkIn_Hardware(projectID: int, hwSet: int, qty: int):
    maxQty = 100
    setNumber = "hw" + str(hwSet)
    
    project = project_collection.find_one({'projectID': projectID})

    if project is not None:
        currentQty = project[setNumber]
        
        if currentQty + qty > maxQty:
            doc = project_collection.find_one_and_update(
                {"projectID" : projectID},
                {"$set":
                    {setNumber: maxQty}
                },upsert=True
            )
            return jsonify({'error': 'total qty exceeds maxQty', 'value': 100})
        else:
            doc = project_collection.find_one_and_update(
                {"projectID" : projectID},
                {"$set":
                    {setNumber: currentQty + qty}
                },upsert=True
            )
            ret = {
                "projectID": projectID,
                "hwSet": hwSet,
                "qty": currentQty + qty
            }
    else:
        return jsonify({'error': 'project does not exist'}), 400

    return jsonify(ret)


@app.route("/api/checkOut/<int:projectID>/<int:hwSet>/<int:qty>")
@cross_origin()
def checkOut_hardWare(projectID: int, hwSet: int, qty: int):
    setNumber = "hw" + str(hwSet)
    project = project_collection.find_one({'projectID': projectID})

    if project is not None:
        currentQty = project[setNumber]        
        if qty > currentQty:
            doc = project_collection.find_one_and_update(
                { "projectID" : projectID},
                {"$set":
                    {setNumber: 0}
                },upsert=True
                )
            return jsonify({'error': 'checkout exceeds current quantity', 'value': 0})
        

        doc = project_collection.find_one_and_update(
            {"projectID" : projectID},
            {"$set":
                {setNumber: currentQty - qty}
            },upsert=True
        )
        ret = {
            'projectID': projectID,
            'hwSet': setNumber,
            'qty': currentQty - qty
        }
        return jsonify(ret)

    return jsonify({'error': 'project does not exist'}), 400


@app.route("/api/join/<int:projectId>")
@cross_origin()
def joinProject(projectId: int):
    global current_project
    if current_project != -1:
        return jsonify({'error': 'already in a group'}), 400
    else:
        current_project = projectId
    ret = {
        'projectId': current_project
    }
    return jsonify(ret)


@app.route("/api/leave/<int:projectId>")
@cross_origin()
def leaveProject(projectId: int):
    global current_project
    current_project = -1
    ret = {
        'projectId': projectId
    }
    return jsonify(ret)


@app.route('/api/login/<username>/<password>/<userID>', methods = ['GET','POST'])
@cross_origin()
def login(username, password, userID):
    user = user_collection.find_one({
        'username': username
    })

    if user:
        if sha256_crypt.verify(userID, user['userID']):
            if sha256_crypt.verify(password, user['password']):
                return jsonify({'msg': "Logged in", 'login': True})

    return jsonify({'msg': "User or password incorrect", 'login': False})


@app.route('/api/signup/<userName>/<password>/<userID>', methods = ['GET','POST'])
@cross_origin()
def signUp(userName, password, userID):
    user = {
        'username': userName,
        'password': sha256_crypt.encrypt(password),
        'userID': sha256_crypt.encrypt(userID)  
    }
    
    if user_collection.find_one({'userID': userID}):
        return jsonify({'msg': "UserID used already"})

    if user_collection.insert_one(user):
        return jsonify({'msg': "User signed up"})
    
    return jsonify({'msg': "Signup failed"})


@app.route('/api/newProject/<projectName>/<int:projectID>/<description>/<authorized>', methods = ['POST'])
@cross_origin()
def newProject(projectName, projectID, description, authorized):
    project = {
        'projectName': projectName,
        'projectID': projectID,
        'description': description,
        'authorized': authorized,
        'hw1' : 0,
        'hw2' : 0
    }
    
    if project_collection.find_one({'projectID': projectID}):
        return jsonify({'msg': "ProjectID used already", 'new': False})

    if project_collection.insert_one(project):
        return jsonify({'msg': "New Project Created", 'new': True})
    
    return jsonify({'msg': "Unable to create project", 'new': False})
   


@app.route("/api/deleteProject/<projectName>/<int:projectID>", methods = ['GET','POST'])
@cross_origin()
def deleteProject(projectName, projectID):
    
    if project_collection.find_one({'projectID': projectID}):
        project_collection.delete_one({'projectID': projectID})
    return jsonify({'msg': "Project \"" + projectName + "\" deleted", 'new': True})



@app.route('/api/projectsList', methods = ['GET'])
@cross_origin()
def projectsList():
    cursor = project_collection.find()
    list_cur = list(cursor)
    list_cur.reverse()
    json_data = json.dumps(list_cur, default=str)
    return json_data

@app.route('/api/getHW/<int:projectID>', methods = ['GET'])
@cross_origin()
def getHW(projectID):
    project = project_collection.find_one({'projectID': projectID})
    json_data = json.dumps(project, default=str)
    return json_data
   
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))



