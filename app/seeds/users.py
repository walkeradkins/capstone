from app.models import db, User, Workspace

# Adds a demo user, you can add other users here if you want


def seed_users():
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

    demo = User(
        first_name='Demo',
        last_name='User',
        email='demo@demo.io',
        password='password',
        user_members=[project1]
    )
    isabella = User(
        first_name='Isabella',
        last_name='Terrell',
        email='Isabella@aa.io',
        password='password',
        user_members=[project1]
    )
    oskar = User(
        first_name='Oskar',
        last_name='Nixon',
        email='Oskar@aa.io',
        password='password',
        user_members=[project1]
    )
    faye = User(
        first_name='Faye',
        last_name='Le',
        email='Faye@aa.io',
        password='password',
        user_members=[project1]
    )
    buddy = User(
        first_name='Buddy',
        last_name='Vu',
        email='Buddy@aa.io',
        password='password',
        user_members=[project2]
    )
    tarun = User(
        first_name='Tarun',
        last_name='Swan',
        email='Tarun@aa.io',
        password='password',
        user_members=[project2]
    )
    abbigail = User(
        first_name='Abbigail',
        last_name='Salter',
        email='Abbigail@aa.io',
        password='password',
        user_members=[project2]
    )

    db.session.add(demo)
    db.session.add(isabella)
    db.session.add(oskar)
    db.session.add(faye)
    db.session.add(buddy)
    db.session.add(tarun)
    db.session.add(abbigail)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
