from flask import Blueprint, request
from app.models import Workspace, User, members, List, db
# from app.forms import WorkspaceForm

list_routes = Blueprint('lists', __name__)

@list_routes.route('/<int:id>')
def lists(id):
    lists = List.query.filter(List.workspace_id == id).all()
    return {'lists': [list.to_dict() for list in lists]}
