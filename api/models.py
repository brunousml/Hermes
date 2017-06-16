from django.db import models

# Create your models here.# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class City(models.Model):
    name = models.CharField(max_length=200)
    state = models.ForeignKey('State', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'city'


class Councilman(models.Model):
    name = models.CharField(unique=True, max_length=200)
    city = models.ForeignKey(City, models.DO_NOTHING, blank=True, null=True)
    state = models.ForeignKey('State', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'councilman'


class CouncilmanDebits(models.Model):
    code = models.IntegerField(blank=True, null=True)
    filename = models.TextField(blank=True, null=True)
    cost_center_code = models.IntegerField(blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    department_type = models.IntegerField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    month = models.IntegerField(blank=True, null=True)
    cost_object = models.CharField(max_length=200, blank=True, null=True)
    cnpj = models.CharField(max_length=20, blank=True, null=True)
    provider = models.CharField(max_length=200, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    councilman = models.ForeignKey(Councilman, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'councilman_debits'


class Country(models.Model):
    name = models.CharField(unique=True, max_length=200)
    slug = models.CharField(unique=True, max_length=2)

    class Meta:
        managed = False
        db_table = 'country'


class State(models.Model):
    name = models.CharField(unique=True, max_length=200)
    slug = models.CharField(unique=True, max_length=2)
    country = models.ForeignKey(Country, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'state'
