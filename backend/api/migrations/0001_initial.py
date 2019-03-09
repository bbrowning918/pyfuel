# Generated by Django 2.1.7 on 2019-03-04 22:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
            ],
            options={
                'ordering': ('-province', 'name'),
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fuel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('liters', models.DecimalField(decimal_places=3, max_digits=6)),
                ('distance', models.DecimalField(decimal_places=1, max_digits=5)),
                ('price_l', models.DecimalField(decimal_places=3, max_digits=4)),
                ('notes', models.CharField(blank=True, max_length=150)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.City')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.Company')),
            ],
            options={
                'ordering': ('vehicle', 'date'),
            },
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('code', models.CharField(max_length=2, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField(choices=[(1950, 1950), (1951, 1951), (1952, 1952), (1953, 1953), (1954, 1954), (1955, 1955), (1956, 1956), (1957, 1957), (1958, 1958), (1959, 1959), (1960, 1960), (1961, 1961), (1962, 1962), (1963, 1963), (1964, 1964), (1965, 1965), (1966, 1966), (1967, 1967), (1968, 1968), (1969, 1969), (1970, 1970), (1971, 1971), (1972, 1972), (1973, 1973), (1974, 1974), (1975, 1975), (1976, 1976), (1977, 1977), (1978, 1978), (1979, 1979), (1980, 1980), (1981, 1981), (1982, 1982), (1983, 1983), (1984, 1984), (1985, 1985), (1986, 1986), (1987, 1987), (1988, 1988), (1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015), (2016, 2016), (2017, 2017), (2018, 2018), (2019, 2019), (2020, 2020)])),
                ('manufacturer', models.CharField(max_length=35)),
                ('model', models.CharField(max_length=25)),
                ('submodel', models.CharField(blank=True, max_length=10)),
                ('vin', models.CharField(blank=True, max_length=25)),
                ('engine_displacement_liters', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleTag',
            fields=[
                ('id', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=35)),
                ('category', models.CharField(choices=[('body', 'Body'), ('drivetrain', 'Drivetrain'), ('engine', 'Engine'), ('fuel', 'Fuel'), ('transmission', 'Transmission')], max_length=15)),
            ],
            options={
                'ordering': ('category', 'id'),
            },
        ),
        migrations.AddField(
            model_name='vehicle',
            name='body',
            field=models.ForeignKey(blank=True, limit_choices_to={'category': 'body'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='body', to='api.VehicleTag'),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='drivetrain',
            field=models.ForeignKey(blank=True, limit_choices_to={'category': 'drivetrain'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='drivetrain', to='api.VehicleTag'),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='engine',
            field=models.ForeignKey(blank=True, limit_choices_to={'category': 'engine'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='engine', to='api.VehicleTag'),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='fuel',
            field=models.ForeignKey(blank=True, limit_choices_to={'category': 'fuel'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='fuel', to='api.VehicleTag'),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='transmission',
            field=models.ForeignKey(blank=True, limit_choices_to={'category': 'transmission'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='transmission', to='api.VehicleTag'),
        ),
        migrations.AddField(
            model_name='fuel',
            name='vehicle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='vehicle_id', to='api.Vehicle'),
        ),
        migrations.AddField(
            model_name='city',
            name='province',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.Province'),
        ),
        migrations.AlterUniqueTogether(
            name='city',
            unique_together={('name', 'province')},
        ),
    ]