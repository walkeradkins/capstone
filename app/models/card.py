from .db import db


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete='CASCADE'), nullable=False)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id', ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    index = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(2000), nullable=True)
    due_date = db.Column(db.DateTime(timezone=False), nullable=True)
    created_at = db.Column(db.DateTime(timezone=False), nullable=False)

    list = db.relationship('List', lazy='subquery', back_populates='cards')
    # list = db.relationship('List', lazy='subquery', cascade='all, delete-orphan', backref=backref('car', cascade='delete'), single_parent=Tru)
    workspace = db.relationship('Workspace', lazy='subquery', back_populates='cards')

    def to_dict(self):
        return {
            'id': self.id,
            'listId': self.list_id,
            'name': self.name,
            'index': self.index,
            'description': self.description,
            'due_date': self.due_date,
            'created_at': self.created_at,
        }
