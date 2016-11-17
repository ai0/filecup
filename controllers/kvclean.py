#!/usr/bin/env python
# coding: utf-8
import web
from config import settings
import sae.kvdb

class cleanKV:

        def GET(self):
                kv = sae.kvdb.KVClient()
                keys=kv.getkeys_by_prefix("",300,None)
                for key in keys:
                        kv.delete(key)
                return "Success"
