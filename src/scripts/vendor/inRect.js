function inRect(point, rectangle) {
  return (
    point.x >= rectangle.left
    && point.x <= rectangle.right
    && point.y >= rectangle.top
    && point.y <= rectangle.bottom
  );
}
