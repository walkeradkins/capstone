from flask import Blueprint, request
from app.models import Workspace, User, members, List, db
import datetime

workspace_routes = Blueprint('workspaces', __name__)

@workspace_routes.route('/<int:userId>')
def workspaces(userId):
    workspaces = Workspace.query.join(members).join(User).filter(members.c.users == userId).all()
    return {'workspaces': [workspace.to_dict() for workspace in workspaces]}