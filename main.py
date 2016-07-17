"""
Set up website, point to index.html and supporting files. 

Think MVC not directories...
Orig path: '/LOC/Falcon/Falcon/static'
"""

import bottle as web
import os


# Memory Game
@web.route('/')
@web.route('/<name>')
@web.view('mem_game')
def index(name='Memorizer'):
    #path = os.path.dirname(os.path.realpath(__file__)) + r'\app'
    #print('path: ' + path)
    return dict(name=name)


# Resource files
@web.route('/resource/<filename>')
def index(filename):
    res_path = os.path.dirname(os.path.realpath(__file__)) + r'\resource'
    #print('res_path: ' + res_path)
    return web.static_file(filename, root=res_path)


# Application files
@web.route('/app/<filename>')
def index(filename):
    app_path = os.path.dirname(os.path.realpath(__file__)) + r'\app'
    #print('app_path: ' + app_path)
    return web.static_file(filename, root=app_path)


# Data files
@web.route('/data/<filename>')
def index(filename):
    data_path = os.path.dirname(os.path.realpath(__file__)) + r'\data'
    #print('data_path: ' + data_path)
    return web.static_file(filename, root=data_path)


web.run(host='localhost', port=8080, debug=True)
