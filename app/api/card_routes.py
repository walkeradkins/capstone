from flask import Blueprint, request
from app.models import Workspace, User, members, List, db, Card
from app.forms import CardForm

card_routes = Blueprint('cards', __name__)


@card_routes.route('/<int:id>')
def cards(id):
    cards = Card.query.filter(Card.workspace_id == id).all()
    return {'cards': [card.to_dict() for card in cards]}


@card_routes.route('/<int:id>', methods=['POST'])
def createCard(id):

    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_card = Card(
            name=form.data['name'],
            workspace_id=form.data['workspace_id'],
            list_id=form.data['list_id'],
            index=form.data['index'],
            description=None,
            due_date=None,
            created_at=form.data['created_at']
        )

        db.session.add(new_card)
        db.session.commit()
        return new_card.to_dict()


@card_routes.route('/<int:cardId>', methods=['PUT'], strict_slashes=False)
def updateCard(cardId):
    card = Card.query.get(cardId)

    new_card = request.json

    if 'name' in new_card:
        name = card.name
        name = new_card['name']
        card.name = name

    if 'list_id' in new_card:
        list_id = card.list_id
        list_id = new_card['list_id']
        card.list_id = list_id

    if 'index' in new_card:
        index = card.index
        index = new_card['index']
        card.index = index

        cards = Card.query.filter(card.list_id == Card.list_id).all()

        for card in cards:
            if card.to_dict()['index'] > new_card['source_index'] and card.to_dict()['index'] <= new_card['index'] and card.to_dict()['id'] != cardId:
                index = card.index
                index = index - 1
                card.index = index
                db.session.merge(card)
                # db.session.flush()
                # db.session.commit()

    db.session.merge(card)
    db.session.flush()
    db.session.commit()

    return card.to_dict()


@card_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def deleteCard(id):
    card = Card.query.get(id)
    db.session.delete(card)
    db.session.commit()
    return card.to_dict()
