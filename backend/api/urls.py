"""API url routing"""
from django.urls import include, path
from api import views
from api import routers

router = routers.OverviewRouter()
router.register(r'vehicles', views.VehicleViewSet, basename='vehicle')
router.register(r'vehicle-tags', views.VehicleTagViewSet, basename='vehicletag')
router.register(r'companies', views.CompanyViewSet, basename='company')
router.register(r'cities', views.CityViewSet, basename='city')
router.register(r'fuel', views.FuelViewSet, basename='fuel')

#wire the router's urls into api
urlpatterns = router.urls

#enables session login and the default coreapi driven docs
urlpatterns += [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
