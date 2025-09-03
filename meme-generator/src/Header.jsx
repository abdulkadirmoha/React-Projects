function Header() {
    return (
      <header className="bg-purple-800 flex items-center justify-around py-4">
            <div className="flex items-center">
            <img className="w-8 mr-2" src="/public/troll-face.png" alt="troll face" />
            <h1 className="text-white text-4 font-medium">Meme generator</h1>
            </div>
      </header>
    );
}
export default Header