from django.core import serializers
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.


from django.shortcuts import render, redirect
from . import models
# 引入模块
from django.utils.timezone import now


def convert_to_dicts(obj):
    # 把Object对象转换成Dict
    dict = {}
    dict.update(obj.__dict__)
    dict.pop("_state", None)  # 去除掉多余的字段
    return dict


# Create your views here.
def search(request):
    if request.method == "POST":
        searchTxt = request.POST.get("searchTxt")
        if(searchTxt):
            listdata = models.Customer.objects.filter(
                #查询条件间的关系为OR的时候，用Q对象包括查询条件，| 符号分开
                #查询条件间的关系为add的时候，直接用‘,’连接查询条件
                Q(name__contains=searchTxt) | Q(status__contains=searchTxt) | Q(phone__contains=searchTxt)
                | Q(serviceAddress__contains=searchTxt)| Q(createAt__contains=searchTxt)
            ).values()
            contents = list(listdata)
            return JsonResponse({'data': contents})
        else:
            listdata = models.Customer.objects.all().values()
            contents = list(listdata)
            return JsonResponse({'data': contents})
    else:
            listdata = models.Customer.objects.all().values()
            contents = list(listdata)
            return JsonResponse({'data': contents})


def lists(request):
    if request.method == "POST":
        listdata = models.Customer.objects.all().values()
        contents = list(listdata)
        return JsonResponse({'data':contents})
    else:
        listdata = models.Customer.objects.all().values()
        contents = list(listdata)
        return JsonResponse({'data':contents})


def get(request):
    id = request.POST.get("id")
    if(id):
        listdata = models.Customer.objects.filter(id=id).values()
        contents = list(listdata)
        return JsonResponse({'data': contents})


def add(request):
    if request.method == "POST":
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        if name and phone :
            customer = models.Customer.objects.create(name=name,phone=phone)
            return JsonResponse({'data':convert_to_dicts(customer)})

def delete(request):
    if request.method == "POST":
        id = request.POST.get("id")
        if id:
            customer = models.Customer.objects.get(id=id).delete()
            return JsonResponse({'data':'success'})


