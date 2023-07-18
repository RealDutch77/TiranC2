from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Agent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text(), nullable=False)
    uid = db.Column(db.String(11), nullable=False)
    interaction = db.Column(db.Text(), nullable=False)
    os = db.Column(db.String(100), nullable=False)
    ram = db.Column(db.String(100), nullable=False)
    pid = db.Column(db.String(100), nullable=False)
    procname = db.Column(db.Text(), nullable=False)
    hostname = db.Column(db.Text(), nullable=False)
    syslan = db.Column(db.Text(), nullable=False)
    ip = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"Agent: {self.uid} "
    
class Command(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    target_uid = db.Column(db.Text(), nullable=False)
    command = db.Column(db.Text(), nullable=False)
    command_par = db.Column(db.Text(), nullable=False)
    command_response = db.Column(db.Text(), nullable=False)

    command_added = db.Column(db.Text(), nullable=False)
    command_received = db.Column(db.Text(), nullable=False)
    command_executed = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"Command: {self.command}:{self.command_par} == {self.command_response}"
    