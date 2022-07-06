from .db import db

members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('workspaces', db.Integer, db.ForeignKey(
        'workspaces.id'), primary_key=True)
)
