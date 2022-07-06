from app.models import db, Card

import datetime

def seed_cards():
    card1= Card(
        list_id=1,
        name='Top 10 Trends list - Forbes',
        description='Top 10 Trends list - Forbes',
        created_at=datetime.datetime.now()
    )
    card2= Card(
        list_id=2,
        name='Android App new landing page',
        description='Android App new landing page',
        created_at=datetime.datetime.now()
    )
    card3= Card(
        list_id=3,
        name='Retail order',
        description='Top 10 Trends list - Forbes Retail order Retail order',
        created_at=datetime.datetime.now()
    )
    card4= Card(
        list_id=4,
        name='Going live with server deployment',
        created_at=datetime.datetime.now()
    )
    card5= Card(
        list_id=5,
        name='How do you adjust the canvas size in Illustrator?',
        description='Top 10 Trends list - Forbes How do you adjust the canvas size in Illustrator?',
        created_at=datetime.datetime.now(),
        due_date=datetime.datetime.now()
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)

    db.session.commit()

def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()