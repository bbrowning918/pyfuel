from rest_framework import routers

class RootView(routers.APIRootView):
    """Overview of all routes"""

class OverviewRouter(routers.DefaultRouter):
    APIRootView = RootView
