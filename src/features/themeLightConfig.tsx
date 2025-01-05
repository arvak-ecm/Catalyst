import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { AppContext } from '@/context/appContext'
import { themeColors, themeVariants } from '@/data/theme'
import { getThemeSystem } from '@/functions/getThemeSystem'
import { changeTheme } from '@/initialize_app/theme'
import { cn } from '@/lib/utils'
import { ThemeProps } from '@/types/theme'
import { signal } from '@preact/signals-react'
import isEqual from 'lodash-es/isEqual'
import { Check } from 'lucide-react'
import React, { memo, use, useTransition } from 'react'

const styles = {
  container: 'flex flex-col items-left gap-1 mb-1 py-2',
  containerRow: 'flex flex-row items-left gap-1 mb-1 py-1',
  title_container: 'text-xs',
  itemActive:
    'transition-colors data-[active=true]:border-primary data-[active=true]:bg-itemSelected'
}
const ThemeLightConfig = () => {
  const context = use(AppContext)
  const radius = signal<string>(context!.theme.radius.replace('rem', ''))
  const transition = signal<string>(context!.theme.transtion)
  const animation = signal<string>(context!.theme.animation)

  const theme = signal<ThemeProps>(context!.theme)
  const [isPending, startTransition] = useTransition()

  const handleChange = (value: Record<string, string>) => {
    const newTheme = {
      ...theme.value,
      ...value
    }

    if (isEqual(newTheme, theme.value)) return
    startTransition(async () => {
      theme.value = newTheme
      await changeTheme(newTheme)
      context!.setTheme(newTheme)
    })
  }
  return (
    <div className="w-[300px] flex flex-col items-left justify-center gap-3 p-2 bg-popover/50 rounded-sm">
      <div className="text-sm flex flex-col items-center">
        <h3>Theme Customizer</h3>
        <small>Customize your components colors</small>
      </div>
      <div className={cn('flex-1', isPending && '')}>
        <div className={styles.container}>
          <h3 className={styles.title_container}>Primary</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeColors.map((item) => (
              <Button
                data-active={theme.value.color === item.name}
                key={item.name}
                className={cn('justify-start capitalize', styles.itemActive)}
                variant="outline"
                size="sm"
                value={item.name}
                style={{ '--theme-primary': item.color } as React.CSSProperties}
                onClick={() => handleChange({ color: item.name })}
              >
                <div className="flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]">
                  {theme.value.color === item.name ? (
                    <Check className="h-4 w-4 text-white " />
                  ) : null}
                </div>
                {item.name}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.containerRow}>
          <h3 className={cn(styles.title_container, 'w-[150px]')}>
            Radius {radius.value}
          </h3>
          <Slider
            defaultValue={[parseFloat(theme.value.radius)]}
            max={1}
            step={0.01}
            onValueCommit={(value: number[]) => {
              handleChange({ radius: `${value[0]}rem` })
            }}
          />
        </div>
        <div className={styles.containerRow}>
          <h3 className={cn(styles.title_container, 'w-[150px]')}>
            Animation {animation.value}
          </h3>
          <Slider
            defaultValue={[parseFloat(theme.value.animation)]}
            max={1000}
            step={50}
            onValueCommit={(value: number[]) => {
              handleChange({ animation: `${value[0]}ms` })
            }}
          />
        </div>
        <div className={styles.containerRow}>
          <h3 className={cn(styles.title_container, 'w-[150px]')}>
            Transtion {transition.value}
          </h3>
          <Slider
            defaultValue={[parseFloat(theme.value.transtion)]}
            max={1000}
            step={50}
            onValueChange={(value: number[]) =>
              (transition.value = `${value[0]}ms`)
            }
            onValueCommit={(value: number[]) =>
              handleChange({ transtion: `${value[0]}ms` })
            }
          />
        </div>
        {/*
        <div className={styles.container}>
          <h3 className={styles.title_container}>Radius</h3>

          <div className="grid grid-cols-5 gap-2">
            {themeRadius.map((item) => (
              <Button
                data-active={theme.value.radius === item.value}
                key={item.name}
                variant="outline"
                size="sm"
                value={item.value}
                onClick={() => handleChange({ radius: item.value })}
                className={styles.itemActive}
              >
                {item.value.replace('rem', '')}
              </Button>
            ))}
          </div>
        </div>
        */}
        <div className={styles.container}>
          <h3 className={styles.title_container}>Mode</h3>
          <div className="flex flex-row gap-2">
            {themeVariants.map((t) => (
              <Button
                key={t.name}
                value={t.value}
                variant="outline"
                size="sm"
                data-active={theme.value.theme === t.name.toLocaleLowerCase()}
                className={styles.itemActive}
                onClick={() => {
                  const nameTheme = getThemeSystem(t.name.toLocaleLowerCase())
                  handleChange({ theme: nameTheme })
                }}
              >
                {t.icon} {t.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ThemeLightConfig)
