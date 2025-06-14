'use client';

import { usePathname } from 'next/navigation';

import { Ellipsis, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Tooltip,
  ScrollArea,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/app/components/common';
import { CollapseMenuButton } from '@/app/components/sidebar';
import { logout } from '@/app/lib/actions/auth';
import { getMenuList } from '@/app/lib/menu-list';
import { cn } from '@/app/lib/utils';
import { Link, useRouter } from '@/i18n/routing';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  const t = useTranslations('Layout.sidebar');
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <ScrollArea className="text-my-neutral-0 [&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <ul
          className={cn(
            'flex min-h-[calc(100vh-80px-1px-224px-30px)] flex-col items-start space-y-1 px-[30px]',
            isOpen
              ? 'lg:min-h-[calc(100vh-80px-1px-150px-30px)]'
              : 'lg:min-h-[calc(100vh-80px-1px-224px-30px)]'
          )}
        >
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div
                      className={cn(
                        'w-full',
                        isOpen ? '' : 'flex justify-center'
                      )}
                      key={index}
                    >
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <div className={cn(isOpen ? '' : 'h-12 w-12')}>
                              <Link
                                href={href}
                                className={cn(
                                  'flex',
                                  'group items-center px-0',
                                  isOpen === false ? 'justify-center' : 'mr-4'
                                )}
                              >
                                <span
                                  className={cn(
                                    'rounded-2xl p-[15px] group-hover:bg-my-secondary-700',
                                    isOpen === false
                                      ? ''
                                      : 'mr-[10px] bg-white/15',
                                    active ? 'bg-my-secondary-700' : ''
                                  )}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    'max-w-[200px] truncate font-medium group-hover:text-my-secondary-700',
                                    isOpen === false
                                      ? '-translate-x-96 opacity-0'
                                      : 'translate-x-0 opacity-100',
                                    active
                                      ? 'font-bold text-my-secondary-700'
                                      : ''
                                  )}
                                >
                                  {t(label)}
                                </p>
                              </Link>
                            </div>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {t(label)}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="flex w-full justify-center" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={t(label)}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li
            className={cn(
              'flex w-full grow items-end',
              isOpen ? '' : 'justify-center'
            )}
          >
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      isOpen
                        ? 'group flex cursor-pointer items-center px-0'
                        : 'flex h-12 w-12'
                    )}
                    onClick={handleLogout}
                  >
                    <span
                      className={cn(
                        'rounded-2xl bg-white/15 p-[15px] group-hover:bg-my-secondary-700',
                        isOpen ? 'mr-[10px]' : ''
                      )}
                    >
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        'max-w-[200px] truncate font-medium group-hover:text-my-secondary-700',
                        isOpen === false
                          ? '-translate-x-96 opacity-0'
                          : 'translate-x-0 opacity-100'
                      )}
                    >
                      {t('logout')}
                    </p>
                  </div>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">{t('logout')}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
