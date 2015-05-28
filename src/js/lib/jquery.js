/**
 * Заглушка для использования локального jQuery или из 4game
 */
export default (typeof jQuery !== 'undefined') ? jQuery : requirejs('packages/jquery');