import datetime
from django.db import models

class Company(models.Model):
    name = models.CharField(unique=True, max_length=55)

    def __str__(self):
        return "%s" % (self.name)

class Province(models.Model):
    code = models.CharField(primary_key=True, max_length=2)

    def __str__(self):
        return "%s" % (self.code)

class City(models.Model):
    name = models.CharField(max_length=55)
    province = models.ForeignKey(Province, models.PROTECT)

    class Meta:
        unique_together = ('name', 'province')
        ordering = ('province', 'name')

    def __str__(self):
        return "%s, %s" % (self.name, self.province)

class VehicleTag(models.Model):
    id = models.CharField(primary_key=True, max_length=3)
    description = models.CharField(max_length=35)
    category_choices = [
        ('body', 'Body'),
        ('drivetrain', 'Drivetrain'),
        ('engine', 'Engine'),
        ('fuel', 'Fuel'),
        ('transmission', 'Transmission'),
    ]
    category = models.CharField(max_length=15, choices=category_choices)

    class Meta:
        ordering = ('category', 'id')


    def __str__(self):
        return "%s" % (self.description)

class Vehicle(models.Model):
    #overrun range by 2 so we allow next model year options
    year_choices = [(r, r) for r in range(1950, datetime.date.today().year+2)]

    year = models.IntegerField(choices=year_choices)
    manufacturer = models.CharField(max_length=35)
    model = models.CharField(max_length=25)
    submodel = models.CharField(max_length=10, blank=True)
    vin = models.CharField(max_length=25, blank=True)
    engine_displacement_liters = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        null=True,
        blank=True
    )
    body = models.ForeignKey(
        VehicleTag,
        models.PROTECT,
        null=True,
        blank=True,
        limit_choices_to={'category':'body'},
        related_name='body'
    )
    engine = models.ForeignKey(
        VehicleTag,
        models.PROTECT,
        null=True,
        blank=True,
        limit_choices_to={'category':'engine'},
        related_name='engine'
    )
    fuel = models.ForeignKey(
        VehicleTag,
        models.PROTECT,
        null=True,
        blank=True,
        limit_choices_to={'category':'fuel'},
        related_name='fuel'
    )
    transmission = models.ForeignKey(
        VehicleTag,
        models.PROTECT,
        null=True,
        blank=True,
        limit_choices_to={'category':'transmission'},
        related_name='transmission'
    )
    drivetrain = models.ForeignKey(
        VehicleTag,
        models.PROTECT,
        null=True,
        blank=True,
        limit_choices_to={'category':'drivetrain'},
        related_name='drivetrain'
    )

    def __str__(self):
        return "%s %s %s" % (self.year, self.manufacturer, self.model)

class Fuel(models.Model):
    date = models.DateTimeField()
    liters = models.DecimalField(max_digits=6, decimal_places=3)
    distance = models.DecimalField(max_digits=5, decimal_places=1)
    price_l = models.DecimalField(max_digits=4, decimal_places=3)
    notes = models.CharField(max_length=150, blank=True)
    city = models.ForeignKey(City, models.PROTECT)
    company = models.ForeignKey(Company, models.PROTECT)
    vehicle = models.ForeignKey(Vehicle, models.PROTECT, related_name='vehicle_id')

    class Meta:
        ordering = ('vehicle', 'date')
