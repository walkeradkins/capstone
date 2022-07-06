from app.models import db, Workspace

def seed_workspaces():
    project1 = Workspace(
        owner_id=1,
        name='Project 1'
    )

    project2 = Workspace(
        owner_id=4,
        name='Project 2'
    )

    db.session.add(project1)
    db.session.add(project2)

    db.session.commit()

def undo_workspaces():
    db.session.execute('TRUNCATE workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()