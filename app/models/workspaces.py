from .db import db
from .members import members


class Workspace(db.Model):
    __tablename__ = 'workspaces'

    id = db.Column(db.Integer, primary_key=True)
    labels = db.Column(db.String(2000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    # one-to-many with List
    lists = db.relationship('List', back_populates='workspace',
                            passive_deletes=True, cascade='save-update,delete,delete-orphan')

    cards = db.relationship('Card', back_populates='workspace',
                            passive_deletes=True, cascade='save-update,delete,delete-orphan')

    # many-to-one with User
    user = db.relationship("User", back_populates="workspaces")

    # many-to-many with User, through members.
    workspace_members = db.relationship(
        "User",
        secondary=members,
        back_populates="user_members",
        # cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'labels': self.labels,
            'lists': [list.to_dict() for list in self.lists],
            "members": [member.to_dict_no_workspace() for member in self.workspace_members]
        }

    def to_dict_no_user(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
        }

    def __repr__(self):
        return f"< WorkspaceId: {self.id}, OwnerId: {self.owner_id}, Name: {self.name}, Channel Members: {self.workspace_members} "
