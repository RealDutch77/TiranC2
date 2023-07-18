def time():
    import datetime
    d = datetime.datetime.now()
    t = d.strftime('%Y-X%m-X%d %H:%M:%S').replace('X0','X').replace('X','')
    return t