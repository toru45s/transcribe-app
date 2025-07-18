from django.urls import path
from .views import HistorySetViewSet, HistoryViewSet
from rest_framework.routers import DefaultRouter
from django.urls import include

router = DefaultRouter()
router.register(r'history-set', HistorySetViewSet, basename='history-set')

history_list_create = HistoryViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


urlpatterns = [
    path('', include(router.urls)),
    path('history-set/<uuid:history_set_id>/history/', history_list_create, name='history-list-create'),

]