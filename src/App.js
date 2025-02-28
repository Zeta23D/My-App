import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const Boy = React.memo(() => {
    const [position, setPosition] = useState({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 200),
    });
    const [message, setMessage] = useState("");
    const [hearts, setHearts] = useState([]);

    const romanticMessages = [
        "Anh nhớ em nhiều lắm!",
        "Em là ánh sáng của anh.",
        "Trái tim anh chỉ có em.",
        "Yêu em đến mãi mãi.",
        "Mỗi ngày bên em là một ngày hạnh phúc.",
        "Em là điều tuyệt vời nhất trong cuộc đời anh.",
        "Anh yêu em nhiều hơn mỗi ngày.",
        "Chỉ cần em cười, mọi thứ đều trở nên đẹp đẽ.",
        "Em là giấc mơ ngọt ngào nhất của anh.",
        "Trái tim anh chỉ đập vì em.",
        "Anh hạnh phúc nhất khi có em bên cạnh.",
        "Tình yêu của anh dành cho em là mãi mãi.",
        "Em là người anh yêu nhất trên thế giới này.",
        "Không gì có thể thay thế được em trong lòng anh.",
        "Anh chỉ cần em trong cuộc đời này.",
        "Em làm cho cuộc sống của anh thêm ý nghĩa.",
        "Anh sẽ mãi yêu em, dù bất cứ điều gì xảy ra.",
        "Bên em, anh có cả thế giới.",
        "Em là nàng công chúa trong câu chuyện của anh.",
        "Trái tim anh thuộc về em mãi mãi.",
        "Yêu em hơn cả chính bản thân mình.",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => ({
                x: Math.random() * (window.innerWidth - 100),
                y: Math.random() * (window.innerHeight - 200),
            }));
            setMessage(
                romanticMessages[
                    Math.floor(Math.random() * romanticMessages.length)
                ]
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleTap = useCallback(() => {
        if (hearts.length < 20) {
            const newHearts = Array(5)
                .fill(0)
                .map(() => ({
                    id: Math.random(),
                    x: position.x + Math.random() * 50 - 25,
                    y: position.y,
                }));
            setHearts((prev) => [...prev, ...newHearts].slice(0, 20));
            setMessage(
                romanticMessages[
                    Math.floor(Math.random() * romanticMessages.length)
                ]
            );
        }
    }, [position, hearts]);

    const boyVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: {
            opacity: 1,
            scale: 1,
            x: [0, 10, -10, 0],
            transition: { duration: 2, repeat: Infinity },
        },
        wave: {
            rotate: [0, 15, -15, 0],
            transition: { duration: 1, repeat: 2 },
        },
        wink: { scaleY: [1, 0.7, 1], transition: { duration: 0.3, repeat: 2 } },
    };

    return (
        <>
            <motion.div
                className="boy"
                style={{ left: position.x, top: position.y }}
                variants={boyVariants}
                initial="initial"
                animate="animate"
                whileHover="wave"
                whileTap={{ onTap: handleTap, variant: "wink" }}
                drag
                dragConstraints={{
                    left: 0,
                    right: window.innerWidth - 100,
                    top: 0,
                    bottom: window.innerHeight - 200,
                }}
            >
                <div className="boy-body">👦</div>
                {message && (
                    <motion.div
                        className="message"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        {message}
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="heart"
                        style={{ left: heart.x, top: heart.y }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ y: heart.y - 100, opacity: 0, scale: 1.5 }}
                        transition={{ duration: 2 }}
                        onAnimationComplete={() =>
                            setHearts((prev) =>
                                prev.filter((h) => h.id !== heart.id)
                            )
                        }
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
});

function App() {
    return (
        <div className="App">
            <div className="background" />
            <h1 className="title">Tình Yêu Lãng Mạn</h1>
            <Boy />
        </div>
    );
}

export default App;
