#!/usr/bin/env python
# coding: utf-8
import web

render = web.template.render('templates/', cache=False)

web.config.debug = True

config = web.storage(
    email='lesice@gmail.com',
    site_name = '文件罐',
    site_keyword = '文件罐,文件分享,临时储存,交换文件',
    site_desc = '快捷简易分享小文件~',
    static = '/static',
)


web.template.Template.globals['config'] = config
web.template.Template.globals['render'] = render
