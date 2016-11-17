#!/usr/bin/env python
# coding: utf-8
import web
from config import settings
import sae.kvdb

render = settings.render

class getFile:

        def GET(self,filename):
                filecode=web.input()
                if filecode:
                        kv = sae.kvdb.KVClient()
                        file = kv.get(str(filecode.f))
                        if file == None:
                                return render.index("filenotfound")
                        web.header('Content-type','application/octet-stream')
                        web.header('Content-disposition', 'attachment; filename=' + filename)
                        return file
                else:
                        return render.index("filenotfound")
