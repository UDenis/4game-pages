/**
 * Заглушка для использования локального React или из 4game
 */
export default (typeof React !== 'undefined') ? React : requirejs('packages/react');