#!/usr/bin/env python
# coding: utf-8
import web
from config import settings
import sae.kvdb

class getKVInfo:

        def GET(self):
                kv = sae.kvdb.KVClient()
                return kv.get_info()
