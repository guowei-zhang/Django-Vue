
from django.urls import path,include
from django.views.generic.base import TemplateView

urlpatterns = [
    path('echarts', TemplateView.as_view(template_name="index.html")),

]
