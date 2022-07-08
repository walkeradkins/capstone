from flask import Blueprint, request
from app.models import Workspace, User, members, List, db
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)


@list_routes.route('/<int:id>')
def lists(id):
    lists = List.query.filter(List.workspace_id == id).all()
    return {'lists': [list.to_dict() for list in lists]}


@list_routes.route('/<int:id>', methods=['POST'])
def createList(id):
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_list = List(
          title = form.data['title'],
          workspace_id = form.data['workspace_id']
        )

        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()

@list_routes.route('/<int:listId>', methods=['PUT'], strict_slashes=False)
def updateWorkspace(listId):
    list = List.query.get(listId)
    new_list = request.json
    title = list.title
    title = new_list['title']
    list.title = title
    db.session.merge(list)
    db.session.flush()
    db.session.commit()

    return list.to_dict()

@list_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def deleteList(id):
    list = List.query.get(id)
    db.session.delete(list)
    db.session.commit()
    return {'id': id}