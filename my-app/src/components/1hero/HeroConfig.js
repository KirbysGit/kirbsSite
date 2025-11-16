/**
 * hero animation configuration.
 * defines all animation configs for hero section elements.
 * takes in a bool indicating if loading is complete, 
 * and returns an object containing all animation configs for hero section elements.
 */
export const getHeroAnimationConfigs = (loadingComplete) => ({
    msgWrapperConfig: {
        initial: { opacity: 0 },
        animate: loadingComplete ? { opacity: 1 } : false,
        transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
    },
    
    supMsgConfig: {
        initial: { x: -500, opacity: 0 },
        animate: loadingComplete ? { x: 0, opacity: 1 } : false,
        transition: { delay: 0.8, duration: 1.2, ease: "easeOut" }
    },
    
    introNameConfig: {
        initial: { x: -500, opacity: 0 },
        animate: loadingComplete ? { x: 0, opacity: 1 } : false,
        transition: { delay: 1.8, duration: 1.2, ease: "easeOut" }
    },
    
    nameRowConfig: {
        initial: { x: -500, opacity: 0 },
        animate: loadingComplete ? { x: 0, opacity: 1 } : false,
        transition: { delay: 2.8, duration: 1.2, ease: "easeOut" }
    },
    
    subNameConfig: {
        initial: { y: -50, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 3.8, duration: 1.2, ease: "easeOut" }
    },
    
    scrollInviteConfig: {
        initial: { y: 50, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 4.8, duration: 1.2, ease: "easeOut" }
    },
    
    navPillsConfig: {
        initial: { y: 50, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 5.4, duration: 1.2, ease: "easeOut" }
    },
    
    arrowConfig: {
        initial: { y: 30, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 6.0, duration: 1.0, ease: "easeOut" }
    }
});


