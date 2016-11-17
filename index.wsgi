import os
import sae
import web    
from config.url import urls

app = web.application(urls, globals()).wsgifunc()

application = sae.create_wsgi_app(app)