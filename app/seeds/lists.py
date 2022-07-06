from app.models import db, List


def seed_lists():
    done = List(
        workspace_id=1,
        title='Done'
    )
    in_progress = List(
        workspace_id=1,
        title='In Progress'
    )
    on_hold = List(
        workspace_id=1,
        title='On Hold'
    )
    current_sprint = List(
        workspace_id=1,
        title='Current Sprint'
    )
    next_up = List(
        workspace_id=1,
        title='Next Up'
    )
    questions = List(
        workspace_id=1,
        title='Questions'
    )
    done2 = List(
        workspace_id=2,
        title='Done'
    )
    in_progress2 = List(
        workspace_id=2,
        title='In Progress'
    )
    on_hold2 = List(
        workspace_id=2,
        title='On Hold'
    )
    current_sprint2 = List(
        workspace_id=2,
        title='Current Sprint'
    )
    next_up2 = List(
        workspace_id=2,
        title='Next Up'
    )
    questions2 = List(
        workspace_id=2,
        title='Questions'
    )

    db.session.add(done)
    db.session.add(in_progress)
    db.session.add(on_hold)
    db.session.add(current_sprint)
    db.session.add(next_up)
    db.session.add(questions)

    db.session.add(done2)
    db.session.add(in_progress2)
    db.session.add(on_hold2)
    db.session.add(current_sprint2)
    db.session.add(next_up2)
    db.session.add(questions2)

    db.session.commit()


def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
