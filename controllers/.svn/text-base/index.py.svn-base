#!/usr/bin/env python
# coding: utf-8
import web
from config import settings
import cgi
import time
import hashlib
import sae.kvdb
import urllib2
import json

render = settings.render
cgi.maxlen = 4 * 1024 * 1024 # KVDB限制4MB

class Index:

        def GET(self):
                return render.index()

        def POST(self):
		try:
			i=web.input(myfile={})
		except ValueError:
			return "文件大小超过4MB。"
		m = hashlib.md5(str(time.time()))
		m.digest()
		filecode=m.hexdigest()
		filename=i['myfile'].filename.decode('utf-8')
		kv = sae.kvdb.KVClient()
		kv.add(filecode,i['myfile'].value)
		fileurl = web.ctx.homedomain + web.ctx.fullpath + filename + '?f=' + filecode
		jsons = urllib2.urlopen("http://api.t.sina.com.cn/short_url/shorten.json?source=1681459862&url_long=" + fileurl).read()
		jsondict = json.loads(jsons)
		return jsondict[0]['url_short']
