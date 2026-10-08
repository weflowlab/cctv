/**
 * 서브메뉴 항목 + PC 드롭다운 서브메뉴
 * - SubMenuItem: 원본 sc-ced4d484 (메뉴 한 줄 링크). PC 는 폭 164px, 모바일 아코디언 안에서는 폭 100%.
 *   hover 시 #f8f8f8 배경.
 * - SubMenuDropdown: 원본 sc-79ea967b (PC 헤더 메뉴 아래 뜨는 흰 카드).
 *   메뉴 기준 top:200% / 가운데 정렬, radius 12px, 그림자. 마우스가 카드 위에 있으면 열린 상태 유지.
 */
import Link from "next/link";
import type { SubMenu } from "./menus";

type ItemProps = { href: string; name: string; fullWidth?: boolean };

export function SubMenuItem({ href, name, fullWidth = false }: ItemProps) {
  return (
    <Link
      href={href}
      className={`flex gap-[12px] rounded-[8px] px-[20px] py-[12px] hover:bg-[#f8f8f8] lg:px-[12px] ${
        fullWidth ? "w-full" : "w-[164px]"
      }`}
    >
      <div className="flex flex-1 flex-col items-start justify-center">
        <h3 className="text-[14px] font-medium leading-[22px] tracking-[-1px] text-[#222]">{name}</h3>
      </div>
    </Link>
  );
}

type DropdownProps = {
  submenus: SubMenu[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function SubMenuDropdown({ submenus, onMouseEnter, onMouseLeave }: DropdownProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-1/2 top-[200%] z-[200] flex -translate-x-1/2 flex-col rounded-[12px] bg-white p-[12px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.1),0px_0px_2px_0px_rgba(0,0,0,0.12)]"
    >
      <div className="flex flex-col">
        {submenus.map((s) => (
          <SubMenuItem key={s.href} href={s.href} name={s.name} />
        ))}
      </div>
    </div>
  );
}
