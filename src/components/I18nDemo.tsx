import { useTranslation } from 'react-i18next';
import { useRTL } from '@/hooks/useRTL';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Languages } from 'lucide-react';

const I18nDemo = () => {
  const { t, i18n } = useTranslation();
  const { isRTL, direction } = useRTL();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5" />
          <span>{t('settings.language')} Demo</span>
        </CardTitle>
        <CardDescription>
          {t('common.loading')} - {t('common.success')} - {t('common.error')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{t('navigation.dashboard')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.welcome')}, {t('auth.patient')}!
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">{t('navigation.appointments')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('appointments.newAppointment')} - {t('appointments.videoCall')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">{t('settings.language')}:</span>
            <Badge variant="outline">{i18n.language.toUpperCase()}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">RTL:</span>
            <Badge variant={isRTL ? "default" : "secondary"}>
              {isRTL ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>Direction: {direction}</p>
          <p>Current Language: {i18n.language}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default I18nDemo;
