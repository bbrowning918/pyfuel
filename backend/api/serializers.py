"""API Serializers"""
from rest_framework import serializers
from api import models

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.VehicleTag
        fields = ('url', 'id', 'description', 'category')

class VehicleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Vehicle
        fields = (
            'url',
            'id',
            'year',
            'manufacturer',
            'model',
            'submodel',
            'vin',
            'engine_displacement_liters',
            'body',
            'engine',
            'fuel',
            'transmission',
            'drivetrain',
        )

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Company
        fields = ('url', 'id', 'name')

class CitySerializer(serializers.HyperlinkedModelSerializer):
    province = serializers.PrimaryKeyRelatedField(queryset=models.Province.objects.all())
    class Meta:
        model = models.City
        fields = ('url', 'id', 'name', 'province')

class FuelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Fuel
        fields = (
            'url',
            'id',
            'date',
            'liters',
            'distance',
            'price_l',
            'vehicle',
            'city',
            'company',
            'notes'
        )
