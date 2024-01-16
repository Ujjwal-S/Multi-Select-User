import { User } from "../../users"
import clsx from "clsx"

export default function SelectedUser({user, selected, handleSelect, onDelete, lastElementSelected, keyBoardNavHover}: {user: User, selected: boolean, handleSelect: (user: User) => void, onDelete: (user: User) => void, lastElementSelected: boolean, keyBoardNavHover?: boolean}) {
    return (
        <div 
            className={clsx(
                'flex items-center rounded-full mb-2 w-max px-2 mx-2 py-1 gap-2 cursor-pointer hover:bg-indigo-600 hover:text-white border-2', 
                (selected || keyBoardNavHover) && 'cursor-default bg-indigo-500 text-white',
                lastElementSelected ? 'border-pink-500' : 'border-white'
            )}
            onClick={() => !selected && handleSelect(user)}
        >
            <img src={user.imgUrl} className='rounded-full w-6 select-none' />
            <span className='relative bottom-0.5'>{user.name}</span>
            <span className={clsx('relative bottom-0.5 opacity-50', selected && 'hidden', keyBoardNavHover && 'opacity-70')}>{user.email}</span>
            <svg onClick={() => onDelete(user)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className={clsx("w-4 h-4 hover:cursor-pointer", !selected && 'hidden')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    )
}