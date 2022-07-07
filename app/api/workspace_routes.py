from flask import Blueprint, request
from app.models import Workspace, User, members, List, db
from app.forms import WorkspaceForm


workspace_routes = Blueprint('workspaces', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@workspace_routes.route('/<int:userId>')
def workspaces(userId):
    workspaces = Workspace.query.join(members).join(
        User).filter(members.c.users == userId).all()
    return {'workspaces': [workspace.to_dict() for workspace in workspaces]}


@workspace_routes.route('/<int:userId>', methods=['POST'], strict_slashes=False)
def new_workspace(userId):
    user = User.query.get(userId)
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace = Workspace(
            name=form.data['name'],
            owner_id=form.data['owner_id'],
        )

        workspace.workspace_members.append(user)
        db.session.add(workspace)
        db.session.commit()

        return workspace.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@workspace_routes.route('/<int:workspaceId>', methods=['PUT'], strict_slashes=False)
def updateWorkspace(workspaceId):
    workspace = Workspace.query.get(workspaceId)
    new_workspace = request.json
    print('-------', new_workspace)
    name = workspace.name
    name = new_workspace['name']
    workspace.name = name
    db.session.merge(workspace)
    db.session.flush()
    db.session.commit()

    return workspace.to_dict()

@workspace_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def deleteWorkspace(id):
    workspace = Workspace.query.get(id)
    print('--------', workspace.to_dict())
    db.session.delete(workspace)
    db.session.commit()
    return workspace.to_dict()