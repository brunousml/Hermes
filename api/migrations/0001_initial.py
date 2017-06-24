# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-22 12:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'city',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Councilman',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
            options={
                'db_table': 'councilman',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CouncilmanDebits',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField(blank=True, null=True)),
                ('filename', models.TextField(blank=True, null=True)),
                ('cost_center_code', models.IntegerField(blank=True, null=True)),
                ('department', models.CharField(blank=True, max_length=100, null=True)),
                ('department_type', models.IntegerField(blank=True, null=True)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('month', models.IntegerField(blank=True, null=True)),
                ('cost_object', models.CharField(blank=True, max_length=200, null=True)),
                ('cnpj', models.CharField(blank=True, max_length=20, null=True)),
                ('provider', models.CharField(blank=True, max_length=200, null=True)),
                ('value', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'councilman_debits',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('slug', models.CharField(max_length=2, unique=True)),
            ],
            options={
                'db_table': 'country',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('slug', models.CharField(max_length=2, unique=True)),
            ],
            options={
                'db_table': 'state',
                'managed': False,
            },
        ),
    ]