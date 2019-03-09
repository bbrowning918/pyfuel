"""API Views"""
from django.db.models import Q
from rest_framework import viewsets, filters
from api import serializers
from api import models

class VehicleTagViewSet(viewsets.ModelViewSet):
    """
    retrieve:
    Return a specific vehicle tag by id

    list:
    Return a list of all vehicle tags.
    A query parameter of 'category' can be used to filter the list

    create:
    Create a new vehicle tag.
    Permitted categories are: body, drivetrain, engine, fuel, transmission

    update:
    Update a vehicle tag instance.

    partial_update:
    Partially update a vehicle tag instance.

    delete:
    Delete a vehicle tag instance.
    """
    serializer_class = serializers.TagSerializer

    def get_queryset(self):
        queryset = models.VehicleTag.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = models.VehicleTag.objects.filter(category=category)
        return queryset

class VehicleViewSet(viewsets.ModelViewSet):
    """
    retrieve:
    Return a specific vehicle.

    list:
    Return a list of all the existing vehicles.
    A query paramater of 'tag' can be used to filter the list by a vehicle-tag

    create:
    Create a new vehicle instance.

    update:
    Update a vehicle instance.

    partial_update:
    Partially update a vehicle instance.

    delete:
    Delete a vehicle instance.
    """
    queryset = models.Vehicle.objects.all()
    serializer_class = serializers.VehicleSerializer

    def get_queryset(self):
        queryset = models.Vehicle.objects.all()
        tag = self.request.query_params.get('tag', None)
        if tag is not None:
            #Django Q for filtering with an OR between all tag fields
            #follow the foreign key to the VehicleTag itself
            #search is not case sensitive
            queryset = models.Vehicle.objects.filter(
                Q(body__id__iexact=tag) |
                Q(engine__id__iexact=tag) |
                Q(fuel__id__iexact=tag) |
                Q(transmission__id__iexact=tag) |
                Q(drivetrain__id__iexact=tag)
            )
        return queryset

class CompanyViewSet(viewsets.ModelViewSet):
    """
    retrieve:
    Return a specific company.

    list:
    Return a list of all the existing companies.

    create:
    Create a new company instance.

    update:
    Update a company instance.

    partial_update:
    Partially update a company instance.

    delete:
    Delete a company instance.
    """
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer

class CityViewSet(viewsets.ModelViewSet):
    """
    retrieve:
    Return a specific city instance.

    list:
    Return a list of all the city instances.
    A query parameter of 'province' can be used to filter by province
    A query parameter of 'search' can be used to filter by city name

    create:
    Create a new city instance.

    update:
    Update a city instance.

    partial_update:
    Partially update a city instance.

    delete:
    Delete a city instance.
    """
    serializer_class = serializers.CitySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    def get_queryset(self):
        queryset = models.City.objects.all()
        province = self.request.query_params.get('province', None)
        if province is not None:
            queryset = models.City.objects.filter(province=province)
        return queryset

class FuelViewSet(viewsets.ModelViewSet):
    """
    retrieve:
    Return a specific fuel instance.

    list:
    Return a list of all fuel instances.
    A query parameter of 'vehicle' can be used to filter by vehicle id

    create:
    Create a new fuel instance.

    update:
    Update a fuel instance.

    partial_update:
    Partially update a fuel instance.

    delete:
    Delete a fuel instance.
    """
    serializer_class = serializers.FuelSerializer

    def get_queryset(self):
        queryset = models.Fuel.objects.all()
        vehicle = self.request.query_params.get('vehicle', None)
        if vehicle is not None:
            queryset = models.Fuel.objects.filter(vehicle=vehicle)
        return queryset
