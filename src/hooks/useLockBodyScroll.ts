import { useEffect } from 'react'
import { useLayoutEffect } from 'react'

// Use useLayoutEffect for smoother UI updates if possible, ensuring layout is computed before paint
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useLockBodyScroll(isLocked: boolean = true) {
    useIsomorphicLayoutEffect(() => {
        if (isLocked) {
            const originalStyle = window.getComputedStyle(document.body).overflow

            // Prevent scrolling
            document.body.style.overflow = 'hidden'

            // Re-enable on cleanup
            return () => {
                document.body.style.overflow = originalStyle
            }
        }
    }, [isLocked])
}
