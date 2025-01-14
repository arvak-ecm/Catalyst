import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CodeXml, Menu, Palette, Settings } from 'lucide-react'
import { useState } from 'react'
import ThemeLightConfig from './themeLightConfig'
import { DropdownMenuItemLink } from '@/components/ui/custom/dropdown-menu'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import About from '../components/about'
import { useTranslation } from 'react-i18next'

const NavigationApp = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative  hover:bg-background/30 rounded-full w-8 h-8 p-0"
        >
          <Menu className="text-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItemLink to="/" onClick={() => setOpen(false)}>
            <CodeXml />
            <span>Home</span>
          </DropdownMenuItemLink>
          <DropdownMenuItemLink
            to="/apistream/enviroment"
            onClick={() => setOpen(false)}
          >
            <CodeXml />
            <span>APIStream</span>
          </DropdownMenuItemLink>
          <DropdownMenuItemLink
            to="/decode/base64"
            onClick={() => setOpen(false)}
          >
            <CodeXml />
            <span>Decode</span>
          </DropdownMenuItemLink>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent></DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="focus:bg-transparent p-1" asChild>
                  <ThemeLightConfig />
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                About
              </DropdownMenuItem>
            </DialogTrigger>
            <About
              appName={t('app.name')}
              version={t('app.version')}
              author={t('app.author')}
              description={t('app.description')}
            />
          </Dialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavigationApp
