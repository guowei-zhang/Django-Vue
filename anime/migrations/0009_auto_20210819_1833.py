# Generated by Django 3.2.6 on 2021-08-19 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anime', '0008_customer_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='remark',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='customer',
            name='score',
            field=models.CharField(default='other', max_length=255),
        ),
    ]
