from .db import db


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey(
        'workspaces.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(50), nullable=False)

    # one-to-many with Card
    cards = db.relationship('Card', back_populates='list',
                            passive_deletes=True, cascade='save-update,delete,delete-orphan')

    # many-to-one with Workspace
    workspace = db.relationship('Workspace', back_populates='lists')

    def to_dict(self):
        return {
            'id': self.id,
            'workspaceId': self.workspace_id,
            'title': self.title,
        }
