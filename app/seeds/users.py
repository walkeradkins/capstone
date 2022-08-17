from app.models import db, User, Workspace

# Adds a demo user, you can add other users here if you want


def seed_users():
    project1 = Workspace(
        owner_id=1,
        labels='{"0":{"text":"Marketing","color":"#61bd4f"},"1":{"text":"Day","color":"#f2d600"},"2":{"text":"Remarket","color":"#ff9f1a"},"3":{"text":"Demand Marketing","color":"#c377e0"},"4":{"text":"Partners","color":"#0079bf"},"5":{"text":"Government","color":"#00c2e0"},"6":{"text":"Planning","color":"#51e898"},"7":{"text":"Happiness","color":"#ff78cb"},"8":{"text":"OEM","color":"#344563"}}',
        name='Project 1',
        background=0,
    )

    project2 = Workspace(
        owner_id=4,
         labels='{"0":{"text":"Marketing","color":"#61bd4f"},"1":{"text":"Day","color":"#f2d600"},"2":{"text":"Remarket","color":"#ff9f1a"},"3":{"text":"Demand Marketing","color":"#c377e0"},"4":{"text":"Partners","color":"#0079bf"},"5":{"text":"Government","color":"#00c2e0"},"6":{"text":"Planning","color":"#51e898"},"7":{"text":"Happiness","color":"#ff78cb"},"8":{"text":"OEM","color":"#344563"}}',
        name='Project 2',
        background=1,
    )

    demo = User(
        first_name='Demo',
        last_name='User',
        email='demo@demo.io',
        password='password',
        user_members=[project1],
        profile_image='https://images.unsplash.com/photo-1573600073955-f15b3b6caab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80'
    )
    isabella = User(
        first_name='Isabella',
        last_name='Terrell',
        email='Isabella@aa.io',
        password='password',
        user_members=[project1],
        profile_image='https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    )
    oskar = User(
        first_name='Oskar',
        last_name='Nixon',
        email='Oskar@aa.io',
        password='password',
        user_members=[project1],
        profile_image='https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    )
    faye = User(
        first_name='Faye',
        last_name='Le',
        email='Faye@aa.io',
        password='password',
        user_members=[project1],
        profile_image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    )
    buddy = User(
        first_name='Buddy',
        last_name='Vu',
        email='Buddy@aa.io',
        password='password',
        user_members=[project2],
        profile_image='https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    )
    tarun = User(
        first_name='Tarun',
        last_name='Swan',
        email='Tarun@aa.io',
        password='password',
        user_members=[project2],
        profile_image='https://images.unsplash.com/photo-1596075780750-81249df16d19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    )
    abbigail = User(
        first_name='Abbigail',
        last_name='Salter',
        email='Abbigail@aa.io',
        password='password',
        user_members=[project2],
        profile_image='https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
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
