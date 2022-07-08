from app.models import db, Card

import datetime

def seed_cards():
    card1= Card(
        list_id=1,
        workspace_id=1,
        name='Top 10 Trends list - Forbes',
        description='Top 10 Trends list - Forbes',
        created_at=datetime.datetime.now()
    )
    card2= Card(
        list_id=2,
        workspace_id=1,
        name='Android App new landing page',
        description='Android App new landing page',
        created_at=datetime.datetime.now()
    )
    card3= Card(
        list_id=3,
        workspace_id=1,
        name='Retail order',
        description='Top 10 Trends list - Forbes Retail order Retail order',
        created_at=datetime.datetime.now()
    )
    card4= Card(
        list_id=4,
        workspace_id=1,
        name='Going live with server deployment',
        created_at=datetime.datetime.now()
    )
    card5= Card(
        list_id=5,
        workspace_id=1,
        name='How do you adjust the canvas size in Illustrator?',
        description='Top 10 Trends list - Forbes How do you adjust the canvas size in Illustrator?',
        created_at=datetime.datetime.now(),
        due_date=datetime.datetime.now()
    )
    card6= Card(
        list_id=1,
        workspace_id=1,
        name='Analytics',
        description='When does the new subway fare hike increase - before or after remote week?',
        created_at=datetime.datetime.now()
    )
    card7= Card(
        list_id=2,
        workspace_id=1,
        name='When does the new subway fare hike increase - before or after remote week?',
        description='When does the new subway fare hike increase - before or after remote week?',
        created_at=datetime.datetime.now()
    )
    card8= Card(
        list_id=3,
        workspace_id=1,
        name='Retail order',
        description='Top 10 Trends list - Forbes Retail order Retail order',
        created_at=datetime.datetime.now()
    )
    card9= Card(
        list_id=4,
        workspace_id=1,
        name='Review Tech partner pages',
        created_at=datetime.datetime.now()
    )
    card10= Card(
        list_id=5,
        workspace_id=1,
        name='Review Tech partner pages?',
        description='Review Tech partner pages',
        created_at=datetime.datetime.now(),
        due_date=datetime.datetime.now()
    )
    card11= Card(
        list_id=1,
        workspace_id=1,
        name='How do you adjust the canvas size in Illustrator?',
        description='Top 10 Trends list - Forbes',
        created_at=datetime.datetime.now()
    )
    card12= Card(
        list_id=2,
        workspace_id=1,
        name='Android App new landing page',
        description='How do you adjust the canvas size in Illustrator?',
        created_at=datetime.datetime.now()
    )
    card13= Card(
        list_id=3,
        workspace_id=1,
        name='How do you adjust the canvas size in Illustrator? order',
        description='Top 10 Trends list - Forbes Retail order Retail order',
        created_at=datetime.datetime.now()
    )
    card14= Card(
        list_id=4,
        workspace_id=1,
        name='Make sure sponsors are indicated for Tech Talk',
        created_at=datetime.datetime.now()
    )
    card15= Card(
        list_id=5,
        workspace_id=1,
        name='How do you adjust the canvas size in Illustrator?',
        description='Make sure sponsors are indicated for Tech Talkthe canvas size in Illustrator?',
        created_at=datetime.datetime.now(),
        due_date=datetime.datetime.now()
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.add(card6)
    db.session.add(card7)
    db.session.add(card8)
    db.session.add(card9)
    db.session.add(card10)
    db.session.add(card11)
    db.session.add(card12)
    db.session.add(card13)
    db.session.add(card14)
    db.session.add(card15)

    db.session.commit()

def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()