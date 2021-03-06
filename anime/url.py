from django.conf.urls import url
from . import views
# include()函数允许引用其他的 URLconf。每当 django 遇到 include()，它会截取 URL
# 中匹配到的前面的部分，并将剩余部分的字符串发送给包含的 URLconf 做进一步处理
app_name = 'student'
urlpatterns = [
    url('search/', views.search, name='search'),
    url('lists/', views.lists, name='lists'),
    url('get/', views.get, name='get'),
    url('add/', views.add, name='add'),
    url('delete/', views.delete, name='delete'),
]