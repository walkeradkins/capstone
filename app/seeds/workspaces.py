from app.forms import workspace_form
from app.models import db, Workspace


def seed_workspaces():
    project1 = Workspace(
        owner_id=1,
        labels='{"0":{"text":"Marketing","color":"#61bd4f"},"1":{"text":"Day","color":"#f2d600"},"2":{"text":"Remarket","color":"#ff9f1a"},"3":{"text":"Demand Marketing","color":"#c377e0"},"4":{"text":"Partners","color":"#0079bf"},"5":{"text":"Government","color":"#00c2e0"},"6":{"text":"Planning","color":"#51e898"},"7":{"text":"Happiness","color":"#ff78cb"},"8":{"text":"OEM","color":"#344563"}}',
        name='Project 1',
        background=0
    )

    project2 = Workspace(
        owner_id=4,
        labels='{"0":{"text":"Marketing","color":"#61bd4f"},"1":{"text":"Day","color":"#f2d600"},"2":{"text":"Remarket","color":"#ff9f1a"},"3":{"text":"Demand Marketing","color":"#c377e0"},"4":{"text":"Partners","color":"#0079bf"},"5":{"text":"Government","color":"#00c2e0"},"6":{"text":"Planning","color":"#51e898"},"7":{"text":"Happiness","color":"#ff78cb"},"8":{"text":"OEM","color":"#344563"}}',
        name='Project 2',
        background=1
    )

    db.session.add(project1)
    db.session.add(project2)

    db.session.commit()


def undo_workspaces():
    db.session.execute('TRUNCATE workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()
